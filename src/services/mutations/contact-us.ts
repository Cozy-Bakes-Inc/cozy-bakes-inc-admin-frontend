"use server";

import { ContactUsDetailsSectionData } from "@/interfaces";
import { safeApi } from "..";

export const createUpdateContactInfo = async (
  payload: ContactUsDetailsSectionData,
) => await safeApi("POST", "/contact/info", payload);
