import { ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  root(): void {
    throw new ForbiddenException();
  }
}
