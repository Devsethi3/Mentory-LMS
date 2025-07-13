import { BarChart3, Calendar, CheckCircle, MessageSquare, Shield } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Enhanced Team Communication",
      description:
        "Streamline your team's communication with real-time messaging, file sharing, and collaborative workspaces.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Intelligent Task Management",
      description:
        "AI-powered task prioritization and automated workflow management to keep your projects on track.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Gain insights into team performance and project progress with comprehensive analytics and reporting.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption and compliance with industry standards.",
    },
  ];
  return (
    <div>
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Enhanced Team Communication
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything your team needs to collaborate effectively and deliver
              exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                New Feature
              </Badge>
              <h3 className="text-3xl font-bold mb-4">Real-Time Messaging</h3>
              <p className="text-muted-foreground mb-6">
                Stay connected with your team through instant messaging, file
                sharing, and real-time notifications. Never miss an important
                update again.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Instant notifications</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>File sharing & collaboration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Thread-based conversations</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 border border-border">
              <div className="bg-card rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                  <div>
                    <div className="font-medium">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">
                      2 min ago
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  Just finished the Q4 presentation. Ready for review! 📊
                </p>
                <div className="bg-muted/50 rounded p-2 text-xs">
                  📎 Q4-Presentation-Final.pptx
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
