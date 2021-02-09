import jwt  from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
    const token = req.header('authorization');
    const bearer = token.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Auth Error' });

    try {
        const { user }: any = jwt.verify(bearer, 'magicPassword');
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Invalid Token' });
    }
};
