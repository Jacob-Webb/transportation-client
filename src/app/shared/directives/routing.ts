/**
 * Custom routing methods for navigation. 
 */
export default class Routing {
  /**
   * Concatenates two strings with a `/` between them.
   * @param envAddress The API url found in `environment.ts`.
   * @param route The route of the API's controller.
   * @returns A complete route from API url to the API's controller method. 
   */
  static createCompleteRoute = (envAddress: string, route: string) : string => {
    return `${envAddress}/${route}`;
  }
}
