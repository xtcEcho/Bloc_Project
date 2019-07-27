//add items to the list by clicking add a item button
function addItem(){
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        //assign the new item the user submit to newItem
        const newItem = $(this).find('#shopping-list-entry').val();
        $('ul').append(`<li>
            <span class="shopping-item">${newItem}</span>
            <div class="shopping-item-controls">
              <button class="shopping-item-toggle">
                <span class="button-label">check</span>
              </button>
              <button class="shopping-item-delete">
                <span class="button-label">delete</span>
              </button>
            </div>
          </li>`);
        
    });
}

//check and uncheck items by clicking check button
function checkItem(){
  $('ul').on('click', 'button.shopping-item-toggle', function(event){
      //console.log(this);
      //find the corresponding item by figuring out the li that check button belong to and the item under it
      const selectedList = $(this).closest('li');
      const selectedItem = selectedList.find('.shopping-item');        
      //console.log(selectedItem.attr('class'));
      selectedItem.toggleClass('shopping-item__checked');
      //console.log(selectedItem.attr('class'));
  });
}

//permanently remove item from list by clicking delete
function deleteItem(){
    $('ul').on('click', 'button.shopping-item-delete', function(event){
      $(this).closest('li').remove();
  });
}

$(addItem());
$(checkItem());
$(deleteItem());