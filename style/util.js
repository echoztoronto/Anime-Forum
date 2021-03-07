// general helper functions

// create an element, need to provide at least one of ID and class name
function create_element(type, ID, cName, parentID) {
    let element = document.createElement(type);
    document.getElementById(parentID).appendChild(element);
    if(ID != '') {
        element.id = ID;
    }
    if(cName != '') {
        element.className = cName;
    }

    return element;
}

// safely remove an element by its ID
function remove_element_by_ID(ID) {
    if(document.getElementById(ID) != null) {
        document.getElementById(ID).remove();
    }
}

// make two div having the same height (input div IDs)
function force_same_height(element1, element2) {
    const d1 = document.getElementById(element1);
    const d2 = document.getElementById(element2);
    let h1 = d1.clientHeight;
    let h2 = d2.clientHeight;
    if(h1 > h2){
        d2.style.height = h1 + "px";
    } else {
        d1.style.height= h2 + "px";
    }
}