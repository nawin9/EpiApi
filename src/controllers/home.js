import pkginfo from '../../package.json';

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
const welcome = ctx => {
    // BUSINESS LOGIC
    const data = {
        name: pkginfo.name,
        version: pkginfo.version,
        description: pkginfo.description,
        author: pkginfo.author,
    };

    ctx.res.ok(data, 'Hello, API!');
};

export default { welcome };
