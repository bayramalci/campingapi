const Database = require('./classes/database'); // Correct path to the database.js file

(async () => {
    const db = new Database(); // Create an instance of the class

    try {
        const result = await db.getQuery('SELECT 1'); // Test query
        console.log(result); // Output: Should show a dummy result
    } catch (error) {
        console.error('Database error:', error.message);
    }
})();
