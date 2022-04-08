## Observations:

iOS seems to have their own default styling that is quite annoying.
    - `-webkit-appearance: none;` to get rid of iOS default styles.
    - `input`, `button` elements so far seem to have their own styling on iOS.

Quite a number of psuedo class/selectors don't work on mobile.
    - `:hover` on mobile just 'sticks' the style and won't remove after clicking; that's probably cause there is not mouse to hover with on mobile.
    - Had to do `@media (hover: hover)` to apply style for those devices that support `:hover`.
    - `:active` also doesn't work on mobile.

Quick way to add feedback to user clicking button.
    - `button:active: { transform: scale(1.2) };` will expand the button when clicked.

Safari on iOS is lacking a lot of modern features. Screen orientation lock for example.
