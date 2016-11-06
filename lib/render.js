/**
 * Checks whether given component is a main layout.
 *
 * @method isMainLayout
 * @param  {Object}     component comnponent to check
 * @return {Boolean}              `true` if it is
 */
function isMainLayout(component) {
    const {token} = component;
    return !!token
}

/**
 * Renders main layout.
 *
 * @method renderMainLayout
 * @param  {Object}         container root container
 * @param  {Object}         component component to render as main layout
 * @return {String}                   rendered markup
 */
function renderMainLayout(container, component) {
    const {render} = component;
    return render;
}

/**
 * Renders arbitraty component.
 *
 * @method renderSingleComponent
 * @param  {Object}         container root container
 * @param  {Object}         component component to render
 * @return {String}                   rendered markup
 */
function renderSingleComponent(container, component) {
    const {render} = component;
    const result = container.replace(`{${token}}`, render);
    return result;
}

/**
 * Renders single component.
 *
 * @method renderComponent
 * @param  {Object}         container root container
 * @param  {String}         component component to render
 * @return {String}                   rendered markup
 */
function renderComponent(container, component) {
    const result = isMainLayout(component) ?
        renderMainLayout(container, component) :
        renderSingleComponent(container, component);

    return result;
}

/**
 * Renders, recursively, list of received components. This assumes that
 * the list represents a component tree (or forrest).
 *
 * Each component is expected to have, at least, the following structure:
 *
 * ```
 * {
 *   id: ...        // component ID
 *   token: ...     // token in parent component to replacve
 *   render: ...    // component's markup to be used for replacement
 * }
 * ```
 *
 * @method render
 * @param {Iterable<Object>}    components components to be rendered
 * @return {String}                        rendered markup
 */
function render(components = []) {
    const markup = components.reduce((container, component) => {
        return renderComponent(container, component);
    }, '');
}

module.exports = {
    render,
    renderComponent
};
