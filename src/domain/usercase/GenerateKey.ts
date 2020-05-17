class GenerateKey {

    public static withSize(size: number): string {
        return Math.random().toString(36).slice(size * (-1));
    }

}

export default GenerateKey;