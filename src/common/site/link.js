export const menuLinks = (menu_data) => {
    //console.log("menu_data", menu_data);

    var menu_link = '';

    if(menu_data){
        if(menu_data?.strapi_parent?.slug){
            menu_link = '/'+menu_data?.strapi_parent?.slug+'/'+menu_data?.slug+'/';
        } else{
            menu_link = '/'+menu_data.slug+'/';
        }
    }
    return menu_link;
}