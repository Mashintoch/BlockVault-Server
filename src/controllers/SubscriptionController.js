/* eslint-disable import/no-extraneous-dependencies */
import mailchimp from "@mailchimp/mailchimp_marketing";
import ClientError from "../exceptions/ClientError";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import config from "../configs/app";
import Waitlist from "../models/Subscribers";

mailchimp.setConfig({
  apiKey: config.MAILCHIMP_API_KEY,
  server: config.MAILCHIMP_SERVER,
});

class Subscription {
  @TryCatchErrorDecorator
  static async subscribe(req, res) {
    const { email } = req.body;

    if (!email) {
      throw new ClientError("Email is required", 400);
    }

    try {
      const response = await mailchimp.lists.addListMember(config.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
      });

      await Waitlist.create({ email });

      return res.status(200).json({ message: "Email added to the waitlist", response });
    } catch (error) {
      console.error("Mailchimp API Error:", error);

      if (error.response?.status === 400 && error.response?.body?.title === "Member Exists") {
        return res.status(400).json({ message: "Email is already on the waitlist" });
      }

      if (error.response?.data) {
        console.error("Mailchimp Error Data:", error.response.data);
      }

      throw new ClientError(`Failed to add email to the waitlist: ${error.message}`, 500);
    }
  }
}

export default Subscription;
