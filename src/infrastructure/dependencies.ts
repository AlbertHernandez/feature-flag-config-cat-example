import { InMemoryUsersRepository } from "./database/in-memory-users-repository";
import { UsersController } from "./rest-api/users-controller";
import { FakeEmailSender } from "./email-sender/fake-email-sender";
import { WelcomeMessageSender } from "../application/welcome-message-sender";
import { UserByIdFinder } from "../domain/user-by-id-finder";
import { FakeSlackSender } from "./slack-sender/fake-slack-sender";
import { ConfigCatFeatureFlagChecker } from "./feature-flag-checker/config-cat-feature-flag-checker";

const configCatFeatureFlagChecker = new ConfigCatFeatureFlagChecker(
  process.env.CONFIG_CAT_SDK_KEY as string,
  {
    pollIntervalSeconds: 10,
  }
);
const inMemoryUsersRepository = new InMemoryUsersRepository();
const fakeEmailSender = new FakeEmailSender();
const fakeSlackSender = new FakeSlackSender();
const userByIdFinder = new UserByIdFinder(inMemoryUsersRepository);
const welcomeEmailSender = new WelcomeMessageSender(
  userByIdFinder,
  fakeEmailSender,
  fakeSlackSender,
  configCatFeatureFlagChecker
);

export const usersController = new UsersController(welcomeEmailSender);
