import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as asg from 'aws-cdk-lib/aws-autoscaling'

export class SparkcogOption1CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, 'vpc', {
      cidr: '17.1.0.0/25',
      maxAzs: 2,
      vpcName: 'RonaldChang',
    })

    const userData = ec2.UserData.forLinux()
    userData.addCommands(
      'yum install -y nginx',
      'chkconfig nginx on',
      'service nginx start',
      'echo "<h1>$(curl -s http://169.254.169.254/latest/meta-data/instance-id)</h1>" > /usr/share/nginx/html/index.html'
    )

    const autoscalingGroup = new asg.AutoScalingGroup(this, 'asg', {
      vpc,
      vpcSubnets: { onePerAz: true },
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.NANO),
      minCapacity: 2,
      maxCapacity: 5,
      userData,
    })

    const loadBalancer = new elb.ApplicationLoadBalancer(this, 'alb', {
      vpc,
      internetFacing: true,
    })

    const listener = loadBalancer.addListener('listener', { port: 80 })
    listener.addTargets('targets', {
      port: 80,
      targets: [autoscalingGroup],
    })

    new cdk.CfnOutput(this, 'albUrl', {
      value: loadBalancer.loadBalancerDnsName,
    })
  }
}
