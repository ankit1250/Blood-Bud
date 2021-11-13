function menuVisible(x){
    x.classList.toggle("change");
    var menu_option = document.querySelector(".navbar ul");
    if(x.classList[1]=="change"){
    menu_option.className= "menu_option";
    }
    else{
        menu_option.className="ul_menu";
    }
    

}