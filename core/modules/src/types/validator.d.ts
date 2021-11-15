interface val_validateClassConfig {
    regex: RegExp | false;
    length: {
        min: number | false,
        max: number | false
    }
    validator?: ((value:any) => boolean)
}