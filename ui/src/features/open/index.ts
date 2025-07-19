import IP from "./ip";
import type { Model as IPModel } from "./ip";

import OS from "./os";
import type { Model as OSModel } from "./os";

import ASN from "./asn";
import type { Model as ASNModel } from "./asn";

import Category from "./category";
import type { Model as CategoryModel } from "./category";

import Protocol from "./protocol";
import type { Model as ProtocolModel } from "./protocol";

import Country from "./country";
import type { Model as CountryModel } from "./country";

export default {
	ip: IP,
	os: OS,
	asn: ASN,
	category: Category,
	protocol: Protocol,
	country: Country,
};

export interface Model {
	asn: ASNModel;
	category: CategoryModel;
	ip: IPModel;
	os: OSModel;
	protocol: ProtocolModel;
	country: CountryModel;
}
