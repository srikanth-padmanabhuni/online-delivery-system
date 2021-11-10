export const staticData = {
    backendBaseUrl: "http://localhost:8080",
    userName: "userName",

    items: [
        {
            'itemId': 200,
            'itemName': 'Paneer Butter Masala',
            'itemType': 'Main Course',
            'itemPrice': 200,
            'itemDescription': 'Ingrdeients are Wheat flour'
        },
        {
            'itemId': 201,
            'itemName': 'Curd Rice',
            'itemType': 'Main Course',
            'itemPrice': 100,
            'itemDescription': 'Ingrdeients are Rice & Curd'
        }
    ],

    restaurents: [
        {
            'rest_id': 980,
            'rest_name': 'Biryani Zone',
            'rest_rating': 4.5,
            'rest_cuisine': '',
            'rest_locality': 'Local',
            'location_id': 300
        },
        {
            'rest_id': 880,
            'rest_name': 'Chinese Chilly',
            'rest_rating': 2.5,
            'rest_cuisine': '',
            'rest_locality': 'Non Local',
            'location_id': 310
        }
    ],

    menuItems: [
        {
            'menu_id': 1000,
            'rest_id': 980,
            'item_id': 200
        },
        {
            'menu_id': 1001,
            'rest_id': 980,
            'item_id': 201
        },
        {
            'menu_id': 1002,
            'rest_id': 880,
            'item_id': 201
        }
    ]
}