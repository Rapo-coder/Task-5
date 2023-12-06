class Contact {
    id: string;
    name: string;
    email: string;
    mobilenumber: string;
    landline: string;
    website: string;
    address: string;
    constructor(args: {
      id: string;
      name: string;
      email: string;
      mobilenumber: string;
      landline: string;
      website: string;
      address: string;
    }) {
      this.id = args.id;
      this.name = args.name;
      this.email = args.email;
      this.mobilenumber = args.mobilenumber;
      this.landline = args.landline;
      this.website = args.website;
      this.address = args.address;
    }
  }
  