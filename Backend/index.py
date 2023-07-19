from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'hello_nikhil'
app.config['MYSQL_PASSWORD'] = 'Vashisht@6282'
app.config['MYSQL_DB'] = 'vacation_rental_db'
app.config['SECRET_KEY'] = 'nikhil'  # Replace with your own secret key

mysql = MySQL(app)
bcrypt = Bcrypt(app)

@app.route('/')
def hello():
    return 'Hello, World!'
    
# Route for creating a new host
@app.route('/hosts', methods=['POST'])
def create_host():
    data = request.get_json()
    name = data['name']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    host_status = data['host_status']
    location = data['location']
    property_type = data['property_type']
    about = data['about']
    hosting_since = data['hosting_since']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO hosts (name, password, host_status, location, property_type, about, hosting_since) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                (name, password, host_status, location, property_type, about, hosting_since))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Host created successfully'), 201


# Route for host login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM hosts WHERE name = %s", (name,))
    host = cur.fetchone()
    cur.close()

    if host is None:
        return jsonify(message='Invalid credentials'), 401

    if bcrypt.check_password_hash(host[2], password):
        token = jwt.encode({'name': host[1]}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify(token=token.decode('utf-8'))

    return jsonify(message='Invalid credentials'), 401


# Route for retrieving all hosts
@app.route('/hosts', methods=['GET'])
def get_hosts():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM hosts")
    hosts = cur.fetchall()
    cur.close()

    host_list = []
    for host in hosts:
        host_dict = {
            'id': host[0],
            'name': host[1],
            'host_status': host[3],
            'location': host[4],
            'property_type': host[5],
            'about': host[6],
            'hosting_since': host[7]
        }
        host_list.append(host_dict)

    return jsonify(hosts=host_list)


# Route for retrieving a specific host
@app.route('/hosts/<int:host_id>', methods=['GET'])
def get_host(host_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM hosts WHERE id = %s", (host_id,))
    host = cur.fetchone()
    cur.close()

    if host is None:
        return jsonify(message='Host not found'), 404

    host_dict = {
        'id': host[0],
        'name': host[1],
        'host_status': host[3],
        'location': host[4],
        'property_type': host[5],
        'about': host[6],
        'hosting_since': host[7]
    }

    return jsonify(host=host_dict)


# Route for updating a host
@app.route('/hosts/<int:host_id>', methods=['PUT'])
def update_host(host_id):
    data = request.get_json()
    name = data['name']
    host_status = data['host_status']
    location = data['location']
    property_type = data['property_type']
    about = data['about']
    hosting_since = data['hosting_since']

    cur = mysql.connection.cursor()
    cur.execute("UPDATE hosts SET name = %s, host_status = %s, location = %s, property_type = %s, about = %s, hosting_since = %s WHERE id = %s",
                (name, host_status, location, property_type, about, hosting_since, host_id))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Host updated successfully')


# Route for deleting a host
@app.route('/hosts/<int:host_id>', methods=['DELETE'])
def delete_host(host_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM hosts WHERE id = %s", (host_id,))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Host deleted successfully')


# Route for creating a new guest
@app.route('/guests', methods=['POST'])
def create_guest():
    data = request.get_json()
    name = data['name']
    gender = data['gender']
    date_of_birth = data['date_of_birth']
    bio = data['bio']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO guests (name, gender, date_of_birth, bio) VALUES (%s, %s, %s, %s)",
                (name, gender, date_of_birth, bio))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Guest created successfully'), 201


# Route for retrieving all guests
@app.route('/guests', methods=['GET'])
def get_guests():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM guests")
    guests = cur.fetchall()
    cur.close()

    guest_list = []
    for guest in guests:
        guest_dict = {
            'id': guest[0],
            'name': guest[1],
            'gender': guest[2],
            'date_of_birth': guest[3].strftime('%Y-%m-%d'),
            'bio': guest[4]
        }
        guest_list.append(guest_dict)

    return jsonify(guests=guest_list)


# Route for retrieving a specific guest
@app.route('/guests/<int:guest_id>', methods=['GET'])
def get_guest(guest_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM guests WHERE id = %s", (guest_id,))
    guest = cur.fetchone()
    cur.close()

    if guest is None:
        return jsonify(message='Guest not found'), 404

    guest_dict = {
        'id': guest[0],
        'name': guest[1],
        'gender': guest[2],
        'date_of_birth': guest[3].strftime('%Y-%m-%d'),
        'bio': guest[4]
    }

    return jsonify(guest=guest_dict)


# Route for updating a guest
@app.route('/guests/<int:guest_id>', methods=['PUT'])
def update_guest(guest_id):
    data = request.get_json()
    name = data['name']
    gender = data['gender']
    date_of_birth = data['date_of_birth']
    bio = data['bio']

    cur = mysql.connection.cursor()
    cur.execute("UPDATE guests SET name = %s, gender = %s, date_of_birth = %s, bio = %s WHERE id = %s",
                (name, gender, date_of_birth, bio, guest_id))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Guest updated successfully')


# Route for deleting a guest
@app.route('/guests/<int:guest_id>', methods=['DELETE'])
def delete_guest(guest_id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM guests WHERE id = %s", (guest_id,))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Guest deleted successfully')


# Route for creating a new booking
@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    property_id = data['property_id']
    guest_id = data['guest_id']
    check_in_date = data['check_in_date']
    check_out_date = data['check_out_date']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date) VALUES (%s, %s, %s, %s)",
                (property_id, guest_id, check_in_date, check_out_date))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Booking created successfully'), 201


# Route for retrieving all bookings
@app.route('/bookings', methods=['GET'])
def get_bookings():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM bookings")
    bookings = cur.fetchall()
    cur.close()

    booking_list = []
    for booking in bookings:
        booking_dict = {
            'id': booking[0],
            'property_id': booking[1],
            'guest_id': booking[2],
            'check_in_date': booking[3].strftime('%Y-%m-%d'),
            'check_out_date': booking[4].strftime('%Y-%m-%d')
        }
        booking_list.append(booking_dict)

    return jsonify(bookings=booking_list)


# Route for retrieving bookings of a specific guest
@app.route('/bookings/guest/<int:guest_id>', methods=['GET'])
def get_guest_bookings(guest_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM bookings WHERE guest_id = %s", (guest_id,))
    bookings = cur.fetchall()
    cur.close()

    booking_list = []
    for booking in bookings:
        booking_dict = {
            'id': booking[0],
            'property_id': booking[1],
            'guest_id': booking[2],
            'check_in_date': booking[3].strftime('%Y-%m-%d'),
            'check_out_date': booking[4].strftime('%Y-%m-%d')
        }
        booking_list.append(booking_dict)

    return jsonify(bookings=booking_list)


# Route for retrieving bookings of a specific property
@app.route('/bookings/property/<int:property_id>', methods=['GET'])
def get_property_bookings(property_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM bookings WHERE property_id = %s", (property_id,))
    bookings = cur.fetchall()
    cur.close()

    booking_list = []
    for booking in bookings:
        booking_dict = {
            'id': booking[0],
            'property_id': booking[1],
            'guest_id': booking[2],
            'check_in_date': booking[3].strftime('%Y-%m-%d'),
            'check_out_date': booking[4].strftime('%Y-%m-%d')
        }
        booking_list.append(booking_dict)

    return jsonify(bookings=booking_list)


# Route for property listing with pagination, filtering, and sorting
@app.route('/properties', methods=['GET'])
def get_properties():
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 10))
    location = request.args.get('location')
    property_type = request.args.get('property_type')
    sort_by = request.args.get('sort_by')
    sort_order = request.args.get('sort_order', 'asc')

    offset = (page - 1) * page_size

    query = "SELECT * FROM properties"

    filters = []
    if location:
        filters.append(f"location = '{location}'")
    if property_type:
        filters.append(f"property_type = '{property_type}'")
    if filters:
        query += " WHERE " + " AND ".join(filters)

    if sort_by:
        query += f" ORDER BY {sort_by} {sort_order.upper()}"

    query += f" LIMIT {offset}, {page_size}"

    cur = mysql.connection.cursor()
    cur.execute(query)
    properties = cur.fetchall()
    cur.close()

    property_list = []
    for prop in properties:
        prop_dict = {
            'id': prop[0],
            'name': prop[1],
            'location': prop[2],
            'property_type': prop[3],
            'description': prop[4],
            'price': prop[5],
            'rating': prop[6]
        }
        property_list.append(prop_dict)

    return jsonify(properties=property_list)


if __name__ == '__main__':
    app.run(debug=True)
