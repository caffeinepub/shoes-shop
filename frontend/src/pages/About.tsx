import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function About() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-foreground text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-3">Our Story</p>
          <h1 className="font-display font-900 text-4xl sm:text-6xl mb-6">
            Crafted for Every Step
          </h1>
          <p className="font-body text-primary-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Sole Street was born from a passion for footwear that blends style, comfort, and craftsmanship.
            We believe the right pair of shoes can transform not just your look, but your entire day.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-3">Who We Are</p>
            <h2 className="font-display font-900 text-3xl sm:text-4xl text-foreground mb-6">
              More Than Just Shoes
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Founded in 2018 in the heart of New York City, Sole Street started as a small boutique
                with a simple mission: to offer premium footwear that doesn't compromise on style or comfort.
              </p>
              <p>
                Today, we curate collections from the world's finest shoemakers, bringing you everything
                from athletic performance shoes to elegant dress footwear. Every pair in our collection
                is hand-selected by our team of footwear enthusiasts.
              </p>
              <p>
                We're committed to sustainable practices, partnering with brands that share our values
                of quality craftsmanship and environmental responsibility.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <img
                src="/assets/generated/product-mens-sneaker.dim_600x600.png"
                alt="Men's collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mt-8">
              <img
                src="/assets/generated/product-womens-boot.dim_600x600.png"
                alt="Women's collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/40 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8+', label: 'Years in Business' },
              { value: '500+', label: 'Shoe Styles' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display font-900 text-4xl sm:text-5xl text-accent mb-2">{stat.value}</p>
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Store Info */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-3">Get in Touch</p>
            <h2 className="font-display font-900 text-3xl sm:text-4xl text-foreground mb-8">
              We'd Love to Hear From You
            </h2>

            {submitted ? (
              <div className="bg-secondary rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display font-800 text-xl text-foreground mb-2">Message Sent!</h3>
                <p className="font-body text-muted-foreground mb-4">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="font-display font-600"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="font-display font-600 text-sm mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="font-display font-600 text-sm mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="font-display font-600 text-sm mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-700 h-12"
                >
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Store Info */}
          <div>
            <p className="font-display font-700 text-xs uppercase tracking-[0.2em] text-accent mb-3">Visit Us</p>
            <h2 className="font-display font-900 text-3xl sm:text-4xl text-foreground mb-8">
              Our Store
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-700 text-sm text-foreground mb-1">Address</h4>
                  <p className="font-body text-sm text-muted-foreground">
                    123 Fashion Avenue<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-700 text-sm text-foreground mb-1">Phone</h4>
                  <p className="font-body text-sm text-muted-foreground">+1 (212) 555-0147</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-700 text-sm text-foreground mb-1">Email</h4>
                  <p className="font-body text-sm text-muted-foreground">hello@solestreet.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-700 text-sm text-foreground mb-1">Business Hours</h4>
                  <div className="font-body text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between gap-8">
                      <span>Monday – Friday</span>
                      <span>9:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Saturday</span>
                      <span>10:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sunday</span>
                      <span>11:00 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden bg-secondary h-48 flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-body">123 Fashion Ave, New York</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
