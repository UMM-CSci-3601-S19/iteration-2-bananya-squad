package umm3601.ride;

import org.bson.Document;
import spark.Request;
import spark.Response;


import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class RideRequestHandler {

  private final RideController rideController;


  public RideRequestHandler(RideController rideController) {
    this.rideController = rideController;
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
    System.err.println(" This is without the parse in adding " + newRide.getString("departureDate"));
    String departureDate = parseDate(newRide.getString("departureDate"));
    System.err.println(" This is with the parse in adding " + departureDate);
    String departureTime = parseTime(newRide.getString("departureTime"));
    String notes = newRide.getString("notes");

    String sortingDate = newRide.getString("departureDate");
    String sortingTime = newRide.getString("departureTime");

    String sortDateTime =  parseDateSorting(sortingDate)+parseColon(sortingTime);


    System.err.println("Adding new ride [driver=" + driver + " destination=" + destination + " origin=" + origin + " roundTrip=" + roundTrip + " driving=" + driving
      + " departureDate=" + departureDate + " departureTime=" + departureTime + " notes=" + notes + ']');
    return rideController.addNewRide(driver, destination, origin, roundTrip, driving, departureDate, departureTime, notes,
      sortDateTime);
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
    System.err.println(" This is with the parse in editing " + departureDate);
    String departureTime = parseTime(editRide.getString("departureTime"));
    String notes = editRide.getString("notes");

    String sortingDate = editRide.getString("departureDate");
    String sortingTime = editRide.getString("departureTime");
    System.err.println(" This is without the parse in editing " + sortingDate);

    String sortDateTime =  parseDateSorting(sortingDate)+parseColon(sortingTime);

    System.err.println("Editing ride [id=" + id + " driver=" + driver + " destination=" + destination + " origin=" + origin + " roundTrip=" + roundTrip + " driving=" + driving
      + " departureDate=" + departureDate + " departureTime=" + departureTime + " notes=" + notes + ']');
    return rideController.updateRide(id, driver, destination, origin, roundTrip, driving, departureDate, departureTime, notes, sortDateTime);
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

  private String parseTime(String rawTime) {
    if (rawTime != null) {
      // Agamprett Singh (Jul 3, 2018) @ https://www.quora.com/How-can-I-convert-the-24-hour-time-format-into-the-12-hour-format-in-Java/answer/Agampreet-Singh-4
      // Converts 24 hour time to 12 hour AM/PM time
      return LocalTime.parse(rawTime, DateTimeFormatter.ofPattern("HH:mm"))
        .format(DateTimeFormatter.ofPattern("h:mm a"));
    } else {
      return "";
    }
  }


  // This parseDate function presents date like 04-13-2019
  private String parseDateSorting(String rawDate) {

    if (rawDate != null) {

      //Date from the datepicker is by default in ISO time, like "2019-03-13T05:00:00.000Z". departureDateISO retrieves that.
      //departureDateYYYYMMDD breaks off the irrelevant end data from the "T" and on. From there, month and day are broken off.
      String departureDateISO = rawDate;
      String departureDateYYYYMMDD = departureDateISO.split("T", 2)[0];

      // Gets the Year in the YYYY Format for the departureDateYYYYMD above
      String departureYear = departureDateYYYYMMDD.split("-", 3)[0];
      // Gets the Month in the MM Format for the departureDateYYYYMD above
      String departureMonth = departureDateYYYYMMDD.split("-", 3)[1];
      // Gets the Day in the DD Format for the departureDateYYYMD above
      String departureDay = departureDateYYYYMMDD.split("-", 3)[2].replaceFirst("^0+(?!$)", "");

      if(Integer.parseInt(departureDay)<10){
        departureDay = "0" + departureDay;
      }

      return departureYear+departureMonth+departureDay;
    } else {
      return "";
    }
  }

  private String parseColon(String rawTime){
    if (rawTime != null) {
      String formatTime = rawTime.replace(":","");
     return formatTime;
    } else {
      return "";
    }
  }



}

