/* ------ General parent class ------  */
function Detail(id, country) {
  this._id = id;
  this._country = country;
}

Detail.prototype.getId = function () {
  return this._id;
};

Detail.prototype.getCountry = function () {
  return this._country;
};

Detail.prototype.setId = function (id) {
  this._id = id;
};

Detail.prototype.setCountry = function (country) {
  this._country = country;
};

Detail.prototype.toString = function () {
  return "ID: " + this._id + ", Country:" + this._country;
};

/* ------ Class for transmission that extends Detail class ------  */
function Transmission(id, country, type, currentGear) {
  Detail.call(this, id, country);
  this._type = type;
  this._currentGear = currentGear;
}

Transmission.prototype = Object.create(Detail.prototype);
Transmission.prototype.constructor = Transmission;

Transmission.prototype.getType = function () {
  return this._type;
};

Transmission.prototype.getCurrentGear = function () {
  return this._currentGear;
};

Transmission.prototype.setType = function (type) {
  this._type = type;
};

Transmission.prototype.setCurrentGear = function (currentGear) {
  this._currentGear = currentGear;
};

Transmission.prototype.toString = function () {
  return Detail.prototype.toString.call(this) + ", Type: " + this._type;
};

/* ------ Class for engine of the car that also extends Detail class ------  */
function Engine(id, country, cylinders, fuelType) {
  Detail.call(this, id, country);
  this._cylinders = cylinders;
  this._fuelType = fuelType;
  this._isStarted = false;
}

Engine.prototype = Object.create(Detail.prototype);
Engine.prototype.constructor = Engine;

Engine.prototype.getCylinders = function () {
  return this._cylinders;
};

Engine.prototype.getFuelType = function () {
  return this._fuelType;
};

Engine.prototype.isStarted = function () {
  return this._isStarted;
};

Engine.prototype.setCylinders = function (cylinders) {
  this._cylinders = cylinders;
};

Engine.prototype.setFuelType = function (fuelType) {
  this._fuelType = fuelType;
};

Engine.prototype.on = function () {
  this._isStarted = true;
};

Engine.prototype.off = function () {
  this._isStarted = false;
};

Engine.prototype.toString = function () {
  return (
    Detail.prototype.toString.call(this) +
    ", Cylinders: " +
    this._cylinders +
    ", Fuel type: " +
    this._fuelType
  );
};

function Car(brand, model, details) {
  this._brand = brand;
  this._model = model;
  this._details = details;
}

Car.prototype.getBrand = function () {
  return this._brand;
};

Car.prototype.getModel = function () {
  return this._model;
};

Car.prototype.getDetails = function () {
  return this._details;
};

Car.prototype.setBrand = function (brand) {
  this._brand = brand;
};

Car.prototype.setModel = function (model) {
  this._model = model;
};

Car.prototype.setDetails = function (details) {
  this._details = details;
};

Car.prototype.startCar = function () {
  for (var i = 0; i < this._details.length; i++) {
    if (this._details[i] instanceof Engine) {
      this._details[i].on();
      break;
    }
  }
};

Car.prototype.turnOffCar = function () {
  for (var i = 0; i < this._details.length; i++) {
    if (this._details[i] instanceof Engine) {
      this._details[i].off();
      break;
    }
  }
};

Car.prototype.setGear = function (gear) {
  for (var i = 0; i < this._details.length; i++) {
    if (this._details[i] instanceof Transmission) {
      this._details[i].setCurrentGear(gear);
      break;
    }
  }
};

Car.prototype.getEngineStatus = function () {
  for (var i = 0; i < this._details.length; i++) {
    if (this._details[i] instanceof Engine) {
      return this._details[i].isStarted();
    }
  }
};

Car.prototype.getTransmissionStatus = function () {
  for (var i = 0; i < this._details.length; i++) {
    if (this._details[i] instanceof Transmission) {
      return this._details[i].getCurrentGear();
    }
  }
};

Car.prototype.getCarStatus = function () {
  return this.getEngineStatus()
    ? "The car is started and current gear is " +
        this.getTransmissionStatus() +
        "."
    : "Car is off and current gear is " + this.getTransmissionStatus() + ".";
};

Car.prototype.getFullCarInfo = function () {
  var resultInfo = "Brand: " + this._brand + "\tModel: " + this._model;
  for (var i = 0; i < this._details.length; i++) {
    resultInfo = resultInfo.concat(
      "\n" + this._details[i].constructor.name + ": \n" + this._details[i] + ";"
    );
  }
  return resultInfo;
};

/* -------- Class Driver to own and manage the car -------- */
function Driver(firstName, lastName, car) {
  this._firstName = firstName;
  this._lastName = lastName;
  this._car = car;
}

Driver.prototype.getFirstName = function () {
  return this._firstName;
};

Driver.prototype.getLastName = function () {
  return this._lastName;
};

Driver.prototype.getCar = function () {
  return this._car;
};

Driver.prototype.setFirstName = function (firstName) {
  this._firstName = firstName;
};

Driver.prototype.setLastName = function (lastName) {
  this._lastName = lastName;
};

Driver.prototype.setCar = function (car) {
  this._car = car;
};

Driver.prototype.startCar = function () {
  this._car.startCar();
};

Driver.prototype.turnOffCar = function () {
  this._car.turnOffCar();
};

Driver.prototype.getCarStatus = function () {
  return this._car.getCarStatus();
};

Driver.prototype.drive = function () {
  if (this._car.getEngineStatus()) {
    this._car.setGear("1");
  } else {
    this._car.startCar();
    this._car.setGear("1");
  }
};

Driver.prototype.stop = function () {
  if (this._car.getEngineStatus()) {
    this._car.setGear("P");
    this._car.turnOffCar();
  } else {
    this._car.setGear("P");
  }
};

Driver.prototype.getCarInfo = function () {
  return this._car.getFullCarInfo();
};

var driver = new Driver(
  "Dima",
  "Andonjev",
  new Car("Toyota", "Supra", [
    new Transmission(12312, "Japan", "Automatic", "P"),
    new Engine(43212, "Japan", 8, "Gas"),
  ])
);

console.log(driver.getCarStatus());
driver.startCar();
console.log(driver.getCarStatus());
driver.drive();
console.log(driver.getCarStatus());
driver.stop();
console.log(driver.getCarStatus());
console.log(driver.getCarInfo());
