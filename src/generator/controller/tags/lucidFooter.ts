
import { Liquid, Context, Emitter } from 'liquidjs';

export const lucidFooterTagRegister = (engine: Liquid, data: gen_templateCompilerProps["footer"]) => {
    return engine.registerTag('lucidFooter', {
        render: async function (context: Context, emitter: Emitter) {
            emitter.write(data);
        }
    });
}