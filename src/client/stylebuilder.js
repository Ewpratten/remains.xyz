/**
 * Logic for auto-generating the theme css files
 */

const Constants = require('../shared/constants');

let root = document.documentElement;

export function setDocumentTheme() {
    root.style.setProperty('--color-bg', Constants.theme.colors.bg);
    root.style.setProperty('--color-mg', Constants.theme.colors.mg);
    root.style.setProperty('--color-fg', Constants.theme.colors.fg);
    root.style.setProperty('--color-player', Constants.theme.colors.player);
    root.style.setProperty('--color-player-shadow', Constants.theme.colors.player_shadow);
    root.style.setProperty('--color-hl1', Constants.theme.colors.hl1);
    root.style.setProperty('--color-hl2', Constants.theme.colors.hl2);
}