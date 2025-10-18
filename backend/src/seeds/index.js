const createAdminUser = require('./adminSeeder');
const seedCategories = require('./categorySeeder');
const seedProducts = require('./productSeeder');

const runAllSeeds = async () => {
    console.log('Starting database seeding...');
    
    try {
        await createAdminUser();
        await seedCategories();
        await seedProducts();
        
        console.log('All seeds completed successfully!');
    } catch (error) {
        console.error('Error running seeds:', error);
    } finally {
        process.exit();
    }
};

// Run if called directly
if (require.main === module) {
    runAllSeeds();
}

module.exports = runAllSeeds;