/* Classes for elements - Everything gets attached to App class */
(function () {
    var App             = this['App'];
    var dialogContainer = document.getElementById('bookmark-dialog');
    
    /* Show hide functionality */
    App.hide = function hide(tag) {
        var elements = document.getElementsByTagName(tag);
        /* Check if element is present */
        if (elements.length !== 0)
        {
            var element           = elements[0];
            element.style.display = 'none';
        }
    };
    
    App.show = function show(tag, template, context) {

        context = context || {};

        var elements = document.getElementsByTagName(tag);
        /* Check if element is present */
        if (elements.length !== 0)
        {
            var element = elements[0];
            /* Check if element is shown */
            if (getDisplay(element) === 'none')
            {
                displayAsFirstChild(element);
            }

            return;
        }

        /* Inserts html as first child element */
        dialogContainer.insertAdjacentHTML('afterbegin', template(context));
    };

    App.displayAsFirstChild = function displayAsFirstChild(element) {
        var firstChild = dialogContainer.firstChild;

        /* Shows element as the first child */
        dialogContainer.insertBefore(element, firstChild);
        element.style.display = 'flex';
    };

    App.getDisplay = function getDisplay(element) {
        return element.currentStyle ? element.currentStyle.display :
               getComputedStyle(element, null).display;
    };

})(window);