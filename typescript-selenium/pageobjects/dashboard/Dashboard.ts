import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES, CLASSES } from "../../types";
import { Driver } from "../../driver/Driver";
import { WebElementCondition, By } from "selenium-webdriver";
import { DriverHelper } from "../../utils/DriverHelper";

/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

@injectable()
export class Dashboard {
    private readonly driverHelper: DriverHelper;

    private static readonly DASHBOARD_BUTTON_CSS: string = "#dashboard-item";
    private static readonly WORKSPACES_BUTTON_CSS: string = "#workspaces-item";
    private static readonly STACKS_BUTTON_CSS: string = "#stacks-item";
    private static readonly FACTORIES_BUTTON_CSS: string = "#factories-item";
    private static readonly LOADER_PAGE_CSS: string = ".main-page-loader"

    constructor(
        @inject(CLASSES.DriverHelper) driverHelper: DriverHelper
    ) {
        this.driverHelper = driverHelper;
    }

    async waitPage(timeout: number) {
        await this.driverHelper.waitVisibility(By.css(Dashboard.DASHBOARD_BUTTON_CSS))
        await this.driverHelper.waitVisibility(By.css(Dashboard.WORKSPACES_BUTTON_CSS))
        await this.driverHelper.waitVisibility(By.css(Dashboard.STACKS_BUTTON_CSS))
        await this.driverHelper.waitVisibility(By.css(Dashboard.FACTORIES_BUTTON_CSS))
    }

    async clickDashboardButton(timeout = DriverHelper.DEFAULT_TIMEOUT) {
        await this.driverHelper.click(By.css(Dashboard.DASHBOARD_BUTTON_CSS), timeout)
    }

    async waitLoaderInvisibility() {
        await this.driverHelper.waitDisappearance(By.css(Dashboard.STACKS_BUTTON_CSS))
    }


}