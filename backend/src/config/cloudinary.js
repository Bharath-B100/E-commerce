const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = async (file, folder = 'ecommerce') => {
    const options = { folder };
    
    if (file.mimetype.startsWith('image/')) {
        options.resource_type = 'image';
        options.quality = 'auto';
        options.fetch_format = 'auto';
    }
    
    try {
        const result = await cloudinary.uploader.upload(file.path, options);
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (error) {
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error(`Cloudinary delete error: ${error.message}`);
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};