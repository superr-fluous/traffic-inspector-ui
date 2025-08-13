import ip from "./ip";
import type { Model as IPModel } from "./ip";

import os from "./os";
import type { Model as OSModel } from "./os";

import asn from "./asn";
import type { Model as ASNModel } from "./asn";

import category from "./category";
import type { Model as CategoryModel } from "./category";

import protocol from "./protocol";
import type { Model as ProtocolModel } from "./protocol";

import country from "./country";
import type { Model as CountryModel } from "./country";

import widget from "./widget";
import type { Model as WidgetModel } from "./widget";

export default {
	ip,
	os,
	asn,
	category,
	protocol,
	country,
	widget,
};

export interface Model {
	asn: ASNModel;
	category: CategoryModel;
	ip: IPModel;
	os: OSModel;
	protocol: ProtocolModel;
	country: CountryModel;
	widget: WidgetModel;
}
