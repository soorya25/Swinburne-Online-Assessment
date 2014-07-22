/*
*Coded by Ray Hasthimuni 22/07/2014
*Swinburne Online Technical Assessment

*Add data-dragable="enabled" to any element to enable drag and drop
*add data-group="" to that element to filter it to that group
*add data-list="list1x" to store the element location before drang and drop to return the elements upon clearing the lists.
*this build only support up to 3 statement lists

*add data-dropZone = "enabled" to make any container a dropzone for dragable items
*add data-zone="" to that container to filter out elements (ie. data-group = data-zone - will pair the dragable items to the dropzones)
*


*/

$(document).ready(function () {

    initDragItems();
    initDropAreas();

    $('#resetA').click(function () {
        resetColumn("colA");
    });

    $('#resetB').click(function () {
        resetColumn("colB");
    });

    $('#resetAll').click(function () {
        resetColumn("colA");
        resetColumn("colB");
        clearColumn("colA");
        clearColumn("colB");

    });

});


/*
*This function will initialise all elements with data-draggable="eneabled" for dragging and dropping. 
*Also Revert option will snap the element back to original position if not dropped in the correct container.
*/
function initDragItems() {
    $('[data-draggable="enabled"]').draggable({
        cursor: "pointer",
        revert: function (event, ui) {
            try {
                $(this).data("uiDraggable").originalPosition = {
                    top: 0,
                    left: 0
                };
                return !event;
            } catch (err) {}
        },
        stop: function (event, ui) {

        }
    });
}

/*
*This function will..
*initialise drop zones with data-DropZone="eneabled" to receive dropped list items
*The filtering of elements in to groups happen with the comparison of value of data-group of the li element and the data-zone of the column drop panel
*Trigger function to add the list item to group list
*Remove the dragged item from the DOM
*/
function initDropAreas() {
    $('[data-dropZone="enabled"]').droppable({
        start: function (event, ui) {
            itemText = $(event).text;
        },
        accept: function (event, ui) {
            return ($(event).data("group") == $(this).data("zone")); //match list group items to zone
        },
        drop: function (event, ui) {
            addToColumn($(ui.draggable).text(), $(this), $(ui.draggable).data("list"));
            $(ui.draggable).remove();
        },
        over: function (event, ui) {}

    });
}

//Add dragged item to the list
function addToColumn(text, listItem, returnList) {
    $(listItem).find("ul").append('<li data-group="' + listItem.data("zone") + '" data-list="' + returnList + '">' + text + '</li>');
}

/*
*Reset column according to the button clicked
*selection will be done with value passed for the data-zone attribute
*recreate the li items in the staments lists for each item in the column zone
*finally clear the column list
*/
function resetColumn(listColumn) {
    $('[data-zone="' + listColumn + '"] ul li').each(function () {
        if ($(this).data("list") == "list1") {
            $('[data-main-list = "list1"]').append(strConstruct(listColumn, '1'))
        }
        if ($(this).data("list") == "list2") {
            $('[data-main-list = "list2"]').append(strConstruct(listColumn, '2'))
        }
        if ($(this).data("list") == "list3") {
            $('[data-main-list = "list3"]').append(strConstruct(listColumn, '3'))
        }
    });

    clearColumn(listColumn);
}

//clear column list
function clearColumn(listName) {
    $('[data-zone="' + listName + '"] ul').empty();
    initDragItems();
}

//reconstruct the li elements for the suggessions lists with all classes and data attributes.
function strConstruct(listColumn, mainList) {
    return '<li class="list-group-item" data-draggable="enabled" data-group="' + listColumn + '" data-list="list' + mainList + '">This goes in Column ' + listColumn.replace('col', '') + '</li>'
}