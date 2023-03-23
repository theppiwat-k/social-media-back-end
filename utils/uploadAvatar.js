const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (file,avatarPath) => {
    try {
        // Check if the file already exists
        await fs.promises.access(avatarPath, fs.constants.F_OK);

        // If the file exists, replace it with the new one
        await sharp(file.path)
            .resize(200, 200)
            .jpeg({ quality: 70 })
            .flatten({ background: '#fff' })
            .toFile(path.join(avatarPath));

        // Delete the uploaded file
        await fs.promises.unlink(file.path);
    } catch (error) {
        // If the file doesn't exist, save it with the new name
        if (error.code === 'ENOENT') {
            await sharp(file.path)
                .resize(200, 200)
                .jpeg({ quality: 70 })
                .flatten({ background: '#fff' })
                .toFile(avatarPath);

            // Delete the uploaded file
            await fs.promises.unlink(file.path);
        } else {
            throw error;
        }
    }
};
