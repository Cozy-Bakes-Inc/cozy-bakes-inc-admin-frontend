"use server";

import { ContactUsDetailsSectionData } from "@/interfaces";
import { safeApi } from "..";

export const createUpdateContactInfo = async (
  payload: Partial<ContactUsDetailsSectionData>,
) => await safeApi("POST", "/contact/info", payload);
