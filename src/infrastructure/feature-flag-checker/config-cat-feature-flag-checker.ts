import { createClient } from "configcat-node";
import {
  FeatureFlagChecker,
  FeatureFlags,
} from "../../domain/feature-flag-checker";
import { IConfigCatClient } from "configcat-common/lib/ConfigCatClient";

export class ConfigCatFeatureFlagChecker implements FeatureFlagChecker {
  private readonly client: IConfigCatClient;

  constructor(sdkKey: string, options?: { pollIntervalSeconds: number }) {
    this.client = createClient(sdkKey, options);
  }

  async isEnabled(
    featureName: FeatureFlags,
    defaultValue?: boolean
  ): Promise<boolean> {
    return await this.client.getValueAsync(featureName, defaultValue);
  }
}
