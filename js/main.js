/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yuli Kim     Student ID: 160437174       Date: Feb 2, 2022
*
*
********************************************************************************/

let restaurantData = [];
var currentRestaurant = {}
var page = 1, perPage = 10;
var map = null;

function avg(grades) {
    var i = 0, _score = 0;
    grades.forEach(e => {
        i++;
        _score += e.score;
    });
    return (_score % i).toFixed(2);
}

var tableRows = _.template(
    `<% _.forEach(restaurantData, function(restaurants) { %>
        <tr data-id=<%- restaurants._id %>>
            <td><%- restaurants.name %></td>
            <td><%- restaurants.cuisine %></td>
            <td><%- restaurants.address.building %><%- restaurants.address.street %></td>
            <td><%- avg(restaurants.grades) %></td>
        </tr>
    <% }); %>`
);

function loadRestaurantData() {
    fetch(`https://web422-as-1.herokuapp.com//api/restaurants?page=${page}&perPage=${perPage}`)
        .then((res) => {
            return res.json();
        })
        .then((myJson) => {
            restaurantData = myJson;
            let rows = tableRows(restaurantData);
            $("#restaurant-table tbody").html(rows);
            $("#current-page").html(page);
        })
}

// be executed when the document is ready
$(function () {
    loadRestaurantData();
});

// 1) Click event for all tr elements within the tbody of the restaurant-table
$("#restaurant-table tbody").on("click", "tr", function (e) {
    let clickedRow = $(this).attr("data-id");
    let currentRestaurant = restaurantData.find(({ _id }) => _id == clickedRow);

    $("#restaurant-modal h4").html(`${currentRestaurant.name}`);
    $("#restaurant-address").html((`${currentRestaurant.address.building} ${address.street}`));

    // Open the "Restaurant" Modal window (ie: <div id= "restaurant-modal" … > … </div>").
    $('#restaurant-modal').modal({
        backdrop: 'static',
        keyboard: false
    });
});

// 2) Previous page button
$("#previous-page").on("click", function (e) {
    if (page > 1) {
        page--;
    }
    loadRestaurantData();
});

// 3) Next page button
$("#next-page").on("click", function (e) {
    page++;
    loadRestaurantData();
});

// 4) shown.bs.modal event for the "Restaurant" modal window
$('#restaurant-modal').on('shown.bs.modal', function () {
    map = new L.Map('leaflet', {
        // TODO
        center: currentRestaurant.address.coord,
        zoom: 18,
        layers: [
            new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        ]
    });
    // TODO
    L.marker(currentRestaurant.address.coord).addTo(map);
});

// 5) hidden.bs.modal event for the "Restaurant" modal window
$('#restaurant-modal').on('hidden.bs.modal', function () {
    map.remove();
});