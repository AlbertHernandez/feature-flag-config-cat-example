export enum FeatureFlags {
  SlackWelcomeMessage = "SlackWelcomeMessage",
}

export interface FeatureFlagChecker {
  isEnabled(
    featureName: FeatureFlags,
    defaultValue?: boolean
  ): Promise<boolean>;
}
