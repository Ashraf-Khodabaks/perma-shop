package org.example;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;


public class Main {

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/hello", Main::hello);
        server.createContext("/api/products", Main::products);
        server.createContext("/", Main::files);
        server.start();
        System.out.println("Server draait op http://localhost:8080");
    }

    // API: stuurt tekst terug
    static void hello(HttpExchange ex) throws IOException {
        send(ex, 200, "text/plain; charset=utf-8", "Hallo Perma!".getBytes(StandardCharsets.UTF_8));

    }
    static final List<Product> PRODUCTS = List.of(
            new Product("parka", "Stormshell Parka", "Outerwear", 189.0, "Een jas waar regen vanaf rolt."),
            new Product("sneaker", "Trail Sneaker", "Footwear", 129.0, "Waterdichte sneaker voor elke dag."),
            new Product("chino", "Stainguard Chino", "Trousers", 95.0, "Een broek waar koffie vanaf rolt."),
            new Product("hat", "Drizzle Bucket Hat", "Accessories", 45.0, "Kleine hoed, grote rand.")
    );

    static void products(HttpExchange ex) throws IOException {
        String json = "[" + PRODUCTS.stream().map(Product::toJson).collect(Collectors.joining(",")) + "]";
        send(ex, 200, "application/json; charset=utf-8", json.getBytes(StandardCharsets.UTF_8));
    }

    // Website: stuurt bestanden uit map "public"
    static void files(HttpExchange ex) throws IOException {
        String path = ex.getRequestURI().getPath();
        if (path.equals("/")) path = "/index.html";

        Path file = Path.of("public", path).normalize();
        if (!file.startsWith("public") || !Files.isRegularFile(file)) {
            send(ex, 404, "text/plain; charset=utf-8", "Niet gevonden".getBytes(StandardCharsets.UTF_8));
            return;
        }
        send(ex, 200, type(file.toString()), Files.readAllBytes(file));
    }

    static String type(String name) {
        if (name.endsWith(".html")) return "text/html; charset=utf-8";
        if (name.endsWith(".css")) return "text/css; charset=utf-8";
        if (name.endsWith(".js")) return "application/javascript; charset=utf-8";
        if (name.endsWith(".json")) return "application/json; charset=utf-8";
        if (name.endsWith(".svg")) return "image/svg+xml";
        if (name.endsWith(".png")) return "image/png";
        if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
        return "application/octet-stream";
    }

    static void send(HttpExchange ex, int code, String contentType, byte[] body) throws IOException {
        ex.getResponseHeaders().set("Content-Type", contentType);
        ex.sendResponseHeaders(code, body.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(body);
        }
    }
}