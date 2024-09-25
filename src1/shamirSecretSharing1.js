const fs = require('fs');

// Function to decode values from different bases
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Read JSON input
fs.readFile('testcase1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    const keys = jsonData.keys;
    const roots = [];

    for (let i = 1; i <= keys.n; i++) {
        const root = jsonData[i];
        if (root) {
            const x = i;  // The key (1, 2, 3, ...)
            const y = decodeValue(root.base, root.value); // Decode the y value
            roots.push({ x, y });
        }
    }

    // Calculate the constant term (c)
    const constantTerm = findConstantTerm(roots, keys.k);
    console.log('Constant term (c):', constantTerm);
});

// Function to calculate the constant term (c) using Lagrange interpolation
function findConstantTerm(roots, k) {
    const n = roots.length;
    let c = 0;

    for (let i = 0; i < n; i++) {
        const { x, y } = roots[i];
        let product = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= (0 - roots[j].x) / (x - roots[j].x);
            }
        }

        c += y * product;
    }

    return Math.round(c); // Round to nearest integer for simplicity
}
