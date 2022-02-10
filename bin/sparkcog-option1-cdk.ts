#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { SparkcogOption1CdkStack } from '../lib/sparkcog-option1-cdk-stack'

const app = new cdk.App()
new SparkcogOption1CdkStack(app, 'SparkcogOption1CdkStack', {
  env: { account: '123456789012', region: 'us-east-1' },
})
