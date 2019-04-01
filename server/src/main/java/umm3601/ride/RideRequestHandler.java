package umm3601.ride;

import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;

import java.text.DateFormatSymbols;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class RideRequestHandler {

  private final RideController rideController;
  private String departureDateDay;

  public RideRequestHandler(RideController rideController) {
    this.rideController = rideController;
  }

  /**
   * Method called from Server when the 'api/rides/:id' endpoint is received.
   * Get a JSON response with a list of all the rides in the database.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return one ride in JSON formatted string and if it fails it will return text with a different HTTP status code
   */
  public String getRideJSON(Request req, Response res) {
    res.type("application/json");
    String destination = req.params("destination");
    String ride;
    try {
      ride = rideController.getRide(destination);
    } catch (IllegalArgumentException e) {
      // This is thrown if the ID doesn't have the appropriate
      // form for a Mongo Object ID.
      // https://docs.mongodb.com/manual/reference/method/ObjectId/
      res.status(400);
      res.body("The requested ride destination " + destination + " wasn't a legal Mongo Object ID.\n" +
        "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
      return "";
    }
    if (ride != null) {
      return ride;
    } else {
      res.status(404);
      res.body("The requested ride with id " + destination + " was not found");
      return "";
    }
  }


  /**
   * Method called from Server when the 'api/rides' endpoint is received.
   * This handles the request received and the response
   * that will be sent back.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return an array of rides in JSON formatted String
   */
  public String getRides(Request req, Response res) {
    res.type("application/json");
    System.err.println(" I got to request Handler");
    return rideController.getRides(req.queryMap().toMap());
  }


  /**
   * Method called from Server when the 'api/rides/new' endpoint is received.
   * Gets specified ride info from request and calls addNewRide helper method
   * to append that info to a document
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return a boolean as whether the ride was added successfully or not
   */
  public String addNewRide(Request req, Response res) {
    res.type("application/json");

    Document newRide = Document.parse(req.body());

    String driver = newRide.getString("driver");
    String destination = newRide.getString("destination");
    String origin = newRide.getString("origin");
    Boolean roundTrip = newRide.getBoolean("roundTrip");
    Boolean driving = newRide.getBoolean("driving");
    String departureDate= parseDate(newRide.getString("departureDate"));
    String departureTime = parseTime(newRide.getString("departureTime"));
    String notes = newRide.getString("notes");


    System.err.println("Adding new ride [driver=" + driver + " destination=" + destination + " origin=" + origin + " roundTrip=" + roundTrip + " driving=" + driving
      + " departureDate=" + departureDate + " departureTime=" + departureTime + " notes=" + notes + ']');
    return rideController.addNewRide(driver, destination, origin, roundTrip, driving, departureDate, departureTime, notes);
  }

  public Boolean updateRide(Request req, Response res) {
    res.type("application/json");

    Document editRide = Document.parse(req.body());

    String id = editRide.getObjectId("_id").toHexString();
    String driver = editRide.getString("driver");
    String destination = editRide.getString("destination");
    String origin = editRide.getString("origin");
    Boolean roundTrip = editRide.getBoolean("roundTrip");
    Boolean driving = editRide.getBoolean("driving");
    String departureDate = parseDate(editRide.getString("departureDate"));
    String departureTime = parseTime(editRide.getString("departureTime"));
    String notes = editRide.getString("notes");


    System.err.println("Editing ride [id=" + id + " driver=" + driver + " destination=" + destination + " origin=" + origin + " roundTrip=" + roundTrip + " driving=" + driving
      + " departureDate=" + departureDate + " departureTime=" + departureTime + " notes=" + notes + ']');
    return rideController.updateRide(id, driver, destination, origin, roundTrip, driving, departureDate, departureTime, notes);
  }

  public Boolean deleteRide(Request req, Response res){
    res.type("application/json");

    Document deleteRide = Document.parse(req.body());

    String id = deleteRide.getString("_id");
    System.err.println("Deleting ride id=" + id);
    return rideController.deleteRide(id);
  }



  /*public String getMonth(int month) {
    return new DateFormatSymbols().getMonths()[month-1];
  }*/


  // This parseDate function presents date like 04-13-2019
  private String parseDate(String rawDate) {

    if (rawDate != null) {

      //Date from the datepicker is by default in ISO time, like "2019-03-13T05:00:00.000Z". departureDateISO retrieves that.
      //departureDateYYYYMMDD breaks off the irrelevant end data from the "T" and on. From there, month and day are broken off.
      String departureDateISO = rawDate;
      String departureDateYYYYMMDD = departureDateISO.split("T", 2)[0];

      // Gets the Year in the YYYY Format for the departureDateYYYYMD above
      String departureYear = departureDateYYYYMMDD.split("-", 3)[0];
      // Gets the Month in the MM Format for the departureDateYYYYMD above
      String departureMonth = departureDateYYYYMMDD.split("-", 3)[1];
      // Gets the Day in the DD Format for the departureDateYYYYMD above
      String departureDay = departureDateYYYYMMDD.split("-", 3)[2].replaceFirst("^0+(?!$)", "");

      if(Integer.parseInt(departureDay)<10){
        departureDay = "0" + departureDay;
      }


      return departureMonth + "-" + departureDay + "-" + departureYear;
    } else {
      return "";
    }
  }



  // This parseDate2 function presents date like: April 13th 2019
  /*private String parseDate2(String rawDate) {

    if (rawDate != null) {
      //Date from the datepicker is by default in ISO time, like "2019-03-13T05:00:00.000Z". departureDateISO retrieves that.
      //departureDateYYYYMMDD breaks off the irrelevant end data from the "T" and on. From there, month and day are broken off.
      String departureDateISO = rawDate;
      System.err.println("This is the rawDate" + rawDate);
      String departureDateYYYYMMDD = departureDateISO.split("T", 2)[0];
      System.err.println("This is the YYYYMMDD " + departureDateYYYYMMDD);
      String departureDateMonthUnformatted = departureDateYYYYMMDD.split("-", 3)[1];
      System.err.println("This is the Month " + departureDateMonthUnformatted);
      String departureDateDayUnformatted = departureDateYYYYMMDD.split("-", 3)[2]
        .replaceFirst("^0+(?!$)", "");
      System.err.println("This is the Date Day " + departureDateDayUnformatted);


      // Gets the Year in the YYYY Format for the departureDateYYYYMD above
      String departureYear = departureDateYYYYMMDD.split("-", 3)[0];
      System.err.println("This is the Departure Year" + departureYear);


      //    Adds the right ending to dates, like the day 12 to 12th or the day 3 to 3rd
      int departureDateDayInt = Integer.parseInt(departureDateDayUnformatted);

      if (departureDateDayInt == 1 || departureDateDayInt == 21 || departureDateDayInt == 31) {
        departureDateDay = departureDateDayUnformatted.concat("st");
      } else if (departureDateDayInt == 2 || departureDateDayInt == 22) {
        departureDateDay = departureDateDayUnformatted.concat("nd");
      } else if (departureDateDayInt == 3 || departureDateDayInt == 23) {
        departureDateDay = departureDateDayUnformatted.concat("rd");
      } else {
        departureDateDay = departureDateDayUnformatted.concat("th");
      }

      //    turns the month number into a month name
      int departureDateMonthInt = Integer.parseInt(departureDateMonthUnformatted);
      String departureDateMonth = getMonth(departureDateMonthInt);

      String departureDateFinal = departureDateMonth + " " + departureDateDay + " " + departureYear;

      return departureDateFinal;
    } else {
      return "";
    }
  }*/


  private String parseTime(String rawTime) {
    if (rawTime != null) {
      // Agamprett Singh (Jul 3, 2018) @ https://www.quora.com/How-can-I-convert-the-24-hour-time-format-into-the-12-hour-format-in-Java/answer/Agampreet-Singh-4
      // Converts 24 hour time to 12 hour AM/PM time
      return LocalTime.parse(rawTime, DateTimeFormatter.ofPattern("HH:mm"))
        .format(DateTimeFormatter.ofPattern("hh:mm a"));
    } else {
      return "";
    }
  }


}

