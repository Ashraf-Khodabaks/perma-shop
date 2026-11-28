// PFAS-gegevens per product. Bron: PFAS.docx van het team.
// Perma maakt kleding ZONDER PFAS. De labels en de meter tonen wat je daardoor vermijdt.

const CLAIM = 'Made without intentionally added PFAS';

// Let op: controleer dit bereik en de eenheid in de bronnen.
// Gremmel et al. (2016) meldt 0.03-719 µg/m² voor 16 jassen.
const AMOUNT_JACKET = '0.06–1,400 µg';

// level = hoe vaak PFAS voorkomt in gewone versies van dit product (uit de tests)
// points = telt mee in de meter in de tas
const LEVELS = {
    high:    { name: 'High',    points: 3 },
    unknown: { name: 'Unknown', points: 1 }
};

const EVIDENCE = {
    strong:   'Strong',
    moderate: 'Moderate',
    weak:     'Weak'
};

const JACKET = {
    level: 'high', evidence: 'strong', amount: AMOUNT_JACKET,
    ours: 'Fluorine-free DWR, polyurethane (PU) waterproof layer, PU seam tape.',
    avoid: 'PFAS in the water-repellent finish. Tested jackets contained ' + AMOUNT_JACKET + '.',
    basis: 'PFAS found in 16 jackets (Gremmel et al. 2016), 9 of 11 (Greenpeace 2016) and 9 of 13 (Toxic-Free Future 2022).'
};

const PANTS = {
    level: 'high', evidence: 'moderate', amount: null,
    ours: 'No fluorinated DWR finish. No PTFE/ePTFE membrane.',
    avoid: 'PFAS in the stain and water-repellent finish. Found in most trousers tested.',
    basis: 'PFAS found in 8 of 8 trousers (Greenpeace 2016) and 3 of 4 (Toxic-Free Future 2022).'
};

const AVOID = {
    parka:  JACKET,
    jacket: JACKET,

    suit: {
        level: 'high', evidence: 'moderate', amount: null,
        ours: 'Fluorine-free DWR, polyurethane (PU) waterproof layer, PU seam tape, synthetic insulation.',
        avoid: 'PFAS in the water-repellent finish, as found in jackets and trousers. Not measured on ski suits themselves.',
        basis: 'Inferred from the tests on jackets and trousers. Ski suits were not measured.'
    },

    // Zet hier de id van je broek neer als die anders heet (zie products.json)
    chino: PANTS, cargo: PANTS, pants: PANTS,
    'cargo-pants': PANTS, 'hiking-pants': PANTS,

    sneaker: {
        level: 'high', evidence: 'moderate', amount: null,
        ours: 'No fluorinated waterproofing coating.',
        avoid: 'PFAS in the waterproofing coating. Found in most shoes tested.',
        basis: 'PFAS found in 7 of 7 shoes (Greenpeace 2016) and 4 of 6 (Ecology Center 2019).'
    },

    boots: {
        level: 'unknown', evidence: 'weak', amount: null,
        ours: 'Hard plastic shell, no fluorinated treatment.',
        avoid: 'Unknown. We found no tests of ski boots.',
        basis: 'Hard plastic shell. No source found.'
    },

    gloves: {
        level: 'unknown', evidence: 'weak', amount: null,
        ours: 'No fluorinated DWR finish.',
        avoid: 'Unknown. We found one tested glove, and it contained no PFAS.',
        basis: 'One glove tested, without PFAS.'
    },

    hat: {
        level: 'unknown', evidence: 'weak', amount: null,
        ours: 'No fluorinated DWR finish.',
        avoid: 'Unknown. We found no tests of hats.',
        basis: 'No source found about hats.'
    },

    wax: {
        level: 'high', evidence: 'strong', amount: '1,040–51,700 µg fluorine per gram',
        ours: 'Fluorine-free glide wax.',
        avoid: 'Fluorinated glide wax. Tested waxes contained 1,040–51,700 µg fluorine per gram.',
        basis: 'Only waxes that contain fluorine were measured (Gonzalez de Vega et al. 2024). Fluorine-free waxes were not found to contain it.'
    },

    hoodie: {
        level: 'unknown', evidence: 'weak', amount: null,
        ours: 'No water- or stain-repellent finish added.',
        avoid: 'Unknown. We found no tests of sweatshirts.',
        // TODO team: zoek een bron over sweatshirts en vul hier in
        basis: 'No source found about sweatshirts yet.'
    }
};

const AVOID_DEFAULT = {
    level: 'unknown', evidence: 'weak', amount: null,
    ours: CLAIM + '.',
    avoid: 'Unknown. No data added for this product yet.',
    basis: 'No source added yet.'
};

function avoidFor(id) {
    return AVOID[id] || AVOID_DEFAULT;
}

function evBadge(a) {
    return `<span class="ev ${a.evidence}">${EVIDENCE[a.evidence]} evidence</span>`;
}

// De inhoud van het label. Wordt gebruikt op de kaart (.label) en op de productpagina (.tag).
function labelInner(p) {
    const a = avoidFor(p.id);
    return `
        <p class="label-title">Perma · care &amp; content</p>
        <p class="claim">${CLAIM}</p>
        <dl>
            <dt>Content</dt>
            <dd>${p.content || ''}</dd>

            <dt>Made with</dt>
            <dd>${a.ours}</dd>

            <dt>You avoid <span class="chip ${a.level}">Level: ${LEVELS[a.level].name}</span></dt>
            <dd>${a.avoid}</dd>

            <dt>Evidence</dt>
            <dd>${evBadge(a)}</dd>

            <dt>Care</dt>
            <dd>${p.wash || ''}</dd>
        </dl>`;
}