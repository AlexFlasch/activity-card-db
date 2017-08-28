import h2c from 'html2canvas';
import { canvasRGB } from 'stackblur-canvas';

const defaultBlurValue = 20;

/* eslint-disable no-unused-vars */
export default {
    directiveName: 'frost',
    bind(el, binding, vnode, oldVnode) {

    },
    inserted(el, binding, vnode, oldVnode) {

    },
    update(el, binding, vnode, oldVnode) {
        // remove old canvases
        const canvases = el.parentNode.querySelectorAll('canvas');
        canvases.forEach(canvas => canvas.remove());
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        let backdropFilterSupport = false;

        // check for backdrop-filter support first
        if(CSS) { // IE doesn't support CSS web api
            backdropFilterSupport = CSS.supports('backdrop-filter');
        }

        // just add backdrop-filter property to el if supported
        // otherwise, take a snapshot of the DOM, render to canvas,
        // and apply blur that way
        if(backdropFilterSupport) {
            el.style.backdropFilter = `blur(${binding.value || defaultBlurValue}px)`;
            el.style['-webkit-backdrop-filter'] = `blur(${binding.value || defaultBlurValue}px)`;
        } else {
            const bodyStyles = document.body.style;

            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
            document.body.style.overflow = 'hidden';

            h2c(document.body, {
                type: 'view',
            }).then((canvas) => {
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';

                // this actually inserts after... javascript amirite? ¯\_(ツ)_/¯
                el.parentNode.insertBefore(canvas, el.nextSibling);
                el.style.overflow = 'hidden';

                canvasRGB(canvas, 0, 0, canvas.width, canvas.height,
                    binding.value || defaultBlurValue);

                document.body.style = bodyStyles;
            });
        }
    },
    unbind(el, binding, vnode, oldVnode) {

    },
};
