import { Alias, Runtime, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { Stack, Duration, CfnOutput } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class ImportReproStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const func = new NodejsFunction(this, "ImportReproFunction", {
      functionName: "ImportReproFunction",
      runtime: Runtime.NODEJS_LATEST,
      entry: "src/handler.js",
      timeout: Duration.seconds(3),
      bundling: {
        externalModules: ["@aws-sdk"],
      },
    });

    // add an alias to the lambda function
    const alias = new Alias(this, "FunctionAlias", {
      aliasName: "live",
      version: func.currentVersion,
    });

    let url = alias.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    // Output the URL of the Lambda Function
    new CfnOutput(this, "FunctionUrl", {
      value: url.url,
      description: "The URL of the Lambda Function",
    });
  }
}
