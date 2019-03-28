package umm3601.profile;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class ProfileController {

  private final MongoCollection<Document> profileCollection;

  public ProfileController(MongoDatabase database) {
    profileCollection = database.getCollection("Users");
  }

  String getProfile(Map<String, String[]> queryParams) {

    Document filterDoc = new Document();

    if (queryParams.containsKey("name")) {
      String targetContent = (queryParams.get("name")[0]);
      Document contentRegQuery = new Document();
      contentRegQuery.append("$regex", targetContent);
      contentRegQuery.append("$options", "i");
      filterDoc = filterDoc.append("name", contentRegQuery);
    }

    FindIterable<Document> matchingProfile = profileCollection.find(filterDoc);

    return serializeIterable(matchingProfile);
  }

  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }
}
