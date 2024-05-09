import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from "@sentry/angular-ivy";
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

Sentry.init({
  dsn: "https://515aebb3f1f94df8086c571db3a6f871@o454001.ingest.us.sentry.io/4507203383263232",
  integrations: [
    // https://docs.sentry.io/platforms/javascript/guides/angular/configuration/integrations/
    Sentry.browserProfilingIntegration(),
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
    Sentry.browserTracingIntegration(),
    // This integration captures all Console API calls and redirects them to Sentry using the
    // SDK's captureMessage or captureException call, depending on the log level.
    // It then re-triggers to preserve default native behavior:
    Sentry.captureConsoleIntegration(),
    // This integration extracts all non-native attributes from the error object and attaches
    // them to the event as extra data. If the error object has a .toJSON() method,
    // the ExtraErrorData integration will run it to extract additional information
    Sentry.extraErrorDataIntegration(),
    // The User Feedback feature allows you to collect user feedback from anywhere inside your application,
    // without requiring an error event to occur
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
    // Registers the Replay integration,
    // which automatically captures Session Replays
    Sentry.replayIntegration(),
    // This integration adds duration data for sessions to events.
    Sentry.sessionTimingIntegration()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

bootstrapApplication(AppComponent, appConfig)
  .then(success => console.log(`Bootstrap success ` + success))
  .catch((err) => console.error(err));
