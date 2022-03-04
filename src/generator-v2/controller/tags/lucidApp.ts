
import { Liquid, Context, Emitter } from 'liquidjs';

export const lucidAppTagRegister = (engine: Liquid, data: gen_templateCompilerProps["components"]) => {
    return engine.registerTag('lucidApp', {
        render: async function (context: Context, emitter: Emitter) {
            if(data != undefined) {
                for (const [key, value] of data.entries()) {
                    emitter.write(value.markup);
                }
            }
        }
    });
}