import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        colorScheme: {
            light: {
                primary: {
                color: '{sky.900}',
                contrastColor: '#ffffff',
                hoverColor: '{sky.900}',
                activeColor: '{sky.800}'
                },
                highlight: {
                background: '{sky.950}',
                focusBackground: '{sky.700}',
                color: '#f2efefff',
                focusColor: '#f2efefff'
                },
            },
            dark: {
                primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.100}',
                activeColor: '{primary.200}'
                },
                highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}'
                }
            }
        }
    }
});

export default Noir;
        