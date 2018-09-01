import { GuidesModule } from './guides.module';

describe('GuidesModule', () => {
  let guidesModule: GuidesModule;

  beforeEach(() => {
    guidesModule = new GuidesModule();
  });

  it('should create an instance', () => {
    expect(guidesModule).toBeTruthy();
  });
});
