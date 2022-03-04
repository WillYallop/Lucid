import { Liquid, Context, Emitter } from 'liquidjs';

export const lucidHeadTagRegister = (engine: Liquid, data: gen_templateCompilerProps["head"]) => {
    return engine.registerTag('lucidHead', {
        render: async function (context: Context, emitter: Emitter) {
            emitter.write(data);
        }
    });
}