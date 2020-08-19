/*
Cocktail, an App
Version 1

Will fetch API data from thecocktaildb, and provide a seprate detailed pages
for each drink, including ingredients, pictures, and instructions.

bon appertif!
*/

const cocktailApp = new Vue({
  el: '#mainpage',
  data: {
    drinkName: "", //taken from input field on cocktailMain page
    results: {}, //results of api fetch
    displayList: false,
    apiKey: 1, //testkey from thecocktaildb.com
    displayDetail: false,
    drinkIndex: null,
    ingredientList: []
  },

  directives: {
    focus: {
      inserted: function (el){
        el.focus();
      }
    }
  },

  methods: {

    fetchAPIData() {
      this.dataAvailable = false;

      if(this.drinkName === "")
        return;
      else {

        //fetch api data
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+this.drinkName)
        .then(response => {
            if(response.ok){
              return response.json();
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
              }
          })
        .then(response => {
            this.results = response;
            this.displayList = true;
        })
        .catch(err => {
          window.alert("Error During API Fetch :(");
          console.log(err);
        });
      }
    },
    generateIngredientList(){
      this.ingredientList = Object.values(
        Object.keys(this.results.drinks[this.drinkIndex]).filter(index => {
          return index.indexOf('strIngredient') == 0;
      }).reduce((ingredientList, index) => {
        ingredientList[index] = this.results.drinks[this.drinkIndex][index];
        return ingredientList;
      }, {} ));

      console.log(this.ingredientList);
    },
    displayDrinkDetails(index){
      this.drinkIndex = index;
      this.generateIngredientList();
      this.displayList = false; //clear screen
      this.displayDetail = true;
    }
  }
});
