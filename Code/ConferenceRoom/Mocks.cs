using System;
using System.Collections.Generic;

namespace Glass.Mapper {
    public class Context { public void Load(params object[] loaders) {} }
}
namespace Glass.Mapper.Sc {
    public class Config {}
    public interface ISitecoreContext {}
    public class SitecoreContext : ISitecoreContext {}
}
namespace Glass.Mapper.Sc.IoC {
    public interface IDependencyResolver { 
        Glass.Mapper.IoC.IConfigFactory<Glass.Mapper.Maps.IGlassMap> ConfigurationMapFactory {get;} 
    }
    public class DependencyResolver : IDependencyResolver { 
        public DependencyResolver(object config) {}
        public Glass.Mapper.IoC.IConfigFactory<Glass.Mapper.Maps.IGlassMap> ConfigurationMapFactory {get; set;}
    }
    public class ConfigurationMapConfigFactory : Glass.Mapper.IoC.IConfigFactory<Glass.Mapper.Maps.IGlassMap> {
        public void Add(Func<Glass.Mapper.Maps.IGlassMap> func) {}
    }
}
namespace Glass.Mapper.Configuration {
    public interface IConfigurationLoader {}
}
namespace Glass.Mapper.Maps {
    public interface IConfigurationMap { T GetConfigurationLoader<T>(); }
    public class ConfigurationMap : IConfigurationMap {
        public ConfigurationMap(object resolver) {}
        public T GetConfigurationLoader<T>() { return (T)(object)new Glass.Mapper.Sc.Configuration.Fluent.SitecoreFluentConfigurationLoader(); }
    }
    public interface IGlassMap {}
}
namespace Glass.Mapper.Sc.Pipelines.Initialize {
    public class GlassMapperSc {
        public virtual Glass.Mapper.Sc.IoC.IDependencyResolver CreateResolver() { return null; }
        public virtual void CreateResolver(Glass.Mapper.Sc.IoC.IDependencyResolver resolver) {}
        public virtual Glass.Mapper.Configuration.IConfigurationLoader[] GetGlassLoaders(Glass.Mapper.Context context) { return null; }
        public virtual void LoadConfigurationMaps(Glass.Mapper.Sc.IoC.IDependencyResolver resolver, Glass.Mapper.Context context) {}
        public virtual void PostLoad(Glass.Mapper.Sc.IoC.IDependencyResolver dependencyResolver) {}
    }
}
namespace Glass.Mapper.IoC {
    public interface IConfigFactory<T> { void Add(Func<T> func); }
}
namespace Glass.Mapper.Sc.Configuration.Fluent {
    public class SitecoreFluentConfigurationLoader : Glass.Mapper.Configuration.IConfigurationLoader {}
}
namespace Glass.Mapper.Sc.Pipelines.GetChromeData {}
namespace Sitecore.ContentSearch {
    public interface IIndexable {}
}
namespace Sitecore.ContentSearch.Linq.Utilities {}
namespace Sitecore.ContentSearch.SearchTypes {}
namespace Sitecore.Buckets {}
namespace Sitecore.Logging {}
namespace Glass.Mapper.Sc.Web.Mvc {
    public class GlassView<T> {}
}
