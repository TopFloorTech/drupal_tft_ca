(function($){
        console.log('w');
    // jQuery Namespaces:
    // jquery for menu page
    var $menu_page = function(sel){
        return $('.page-admin-structure-menu-manage').find(sel);
    }

    function convert_to_slug(text){
        return text
            .trim()
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    }

    function set_state_value_to_class(){
        var $states = $('.field-name-field-content-state,.views-field-field-content-state');
        $states.each(function(){
            var $this = $(this);
            console.log($this);

            $this.addClass(convert_to_slug($this.text()));
        });
    }

    function add_menu_add_sibling_links(){
        var $mp = $menu_page;
        var $add_item = $mp('.menu-additem');
        var $menu_items = $mp('tr.menu-enabled');
        $menu_items.find('.menu-overview-title-link').
            append('<a href="#" class="add-sibling">Add Content</a>').
            click(function(e){
                console.log(e);
                var tableDrag = $(e.currentTarget).parent().parent();
                var diff = $add_item.position().top - tableDrag.position().top;

                // get index
                //var index = tableDrag.index();
                console.log($add_item.position().top);
                console.log(tableDrag.position().top);
                console.log(diff);
                var indentation = tableDrag.find('.indentation').length;
                var dy = diff > 0 ? (diff * -1) + 30: (diff *-1);
                console.log(dy);
                $add_item.find('a').simulate( "drag", {
		    dx: 0,
		    dy: dy
		});
            });
    }

    function add_menu_add_form_placeholder(){
        $menu_page('.menu-additem input').attr('placeholder','New content title');
    }

    $(document).ready(function(){
        // add 'Back To Dashboard link on all titles except dashboard'
        $('body').not('.page-admin-dashboard').
            find('h1.page-title').
            append('<a href="/admin/dashboard" class="dashboard">Back To Dashboard</a>');

        // add logout button
        $('h1.page-title').prepend('<a class="logout" href="/user/logout">Log Out</a>');

        // unbind the annoying menu ctools things in firefox
        $menu_page('#menu-overview-form .menu-operations *').unbind('');

        // add state css
        set_state_value_to_class();
        add_menu_add_sibling_links();
        add_menu_add_form_placeholder();

    });
})(jQuery);